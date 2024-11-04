import prisma from "@/prisma";
import resend from "@/resend";
import cron from "node-cron";

// Cron job untuk mengirim email saat h-1 yang dijalankan setiap hari pada jam 00:00
cron.schedule("1 0 * * *", async () => {
    // Mendapatkan awal hari besok (jam 00:00:00)
    const startOfTomorrow = new Date();
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
    startOfTomorrow.setHours(0, 0, 0, 0);

    // Mendapatkan akhir hari besok (jam 23:59:59)
    const endOfTomorrow = new Date(startOfTomorrow);
    endOfTomorrow.setHours(23, 59, 59, 999);

    const subscriptionsExpiring = await prisma.subscription.findMany({
        where: {
            endDate: {
                gte: startOfTomorrow,
                lte: endOfTomorrow,
            },
            isActive: true,
        },
        include: {
            user: true,
        },
    });

    console.log("Subscriptions expiring tomorrow:", subscriptionsExpiring);
    subscriptionsExpiring.forEach(async (subscription) => {
        await prisma.subscription.update({
            where: { id: subscription.id },
            data: { isApproved: null, transferProof: null, paymentId: null },
        });
        await sendRenewalEmail(subscription.user?.email!);
    });
});

// Cron job untuk menonaktifkan subscription yang habis masa berlakunya pada jam 00:00 setiap hari
cron.schedule("0 0 * * *", async () => {
    const today = new Date();

    await prisma.subscription.updateMany({
        where: {
            endDate: { lt: today },
            isActive: true,
        },
        data: {
            isActive: false,
            isApproved: null,
            transferProof: null,
            quotaAssessment: null,
            paymentId: null,
        },
    });

    await prisma.endorsement.updateMany({
        where: {
            expiresAt: { lt: today },
            isExpired: false,
        },
        data: {
            isExpired: true,
        },
    });
});

// Cron schedule untuk mengirim email pengingat pembaruan endorsement
cron.schedule("1 0 * * *", async () => {
    // Mendapatkan awal hari besok (jam 00:00:00)
    const startOfTomorrow = new Date();
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
    startOfTomorrow.setHours(0, 0, 0, 0);

    // Mendapatkan akhir hari besok (jam 23:59:59)
    const endOfTomorrow = new Date(startOfTomorrow);
    endOfTomorrow.setHours(23, 59, 59, 999);

    const endorsementsExpiring = await prisma.endorsement.findMany({
        where: {
            expiresAt: {
                gte: startOfTomorrow,
                lte: endOfTomorrow,
            },
            isExpired: false,
        },
        include: {
            user: true,
        },
    });

    endorsementsExpiring.forEach(async (endorsement) => {
        await sendRenewalEndorsementEmail(endorsement.user?.email!);
    });
});

async function sendRenewalEndorsementEmail(userEmail: string) {
    try {
        const htmlContent = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #4CAF50;">Pengingat Pembaruan Endorsement</h1>
            <p>Halo,</p>
            <p>Endorsement Anda akan berakhir besok. Mohon untuk memperbarui endorsement Anda
            agar tetap dapat menikmati layanan kami tanpa gangguan. Anda dapat memperbarui endorsement
            Anda melalui dashboard User atau bisa langsung klik tombol dibawah.</p>
            <a href="${process.env.APP_URL}/account/endorsement"
               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
            Perbarui Endorsement
            </a>
            <p style="margin-top: 20px;">
            Jika tombol di atas tidak berfungsi, gunakan tautan ini: <a href="${process.env.APP_URL}/account/endorsement">${process.env.APP_URL}/account/endorsement</a>
            </p>
            <p>Terima kasih telah menggunakan layanan kami.</p>
        </div>`;

        const { data, error } = await resend.emails.send({
            from: "WorkHive <noreply@workhive.my.id>",
            to: userEmail,
            subject: "Pengingat untuk Memperbarui Langganan Anda",
            html: htmlContent,
        });

        if (error) throw error;
    } catch (error) {
        console.error("Error sending renewal email", error);
    }
}

async function sendRenewalEmail(userEmail: string) {
    try {
        const htmlContent = `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h1 style="color: #4CAF50;">Pengingat Pembaruan Langganan</h1>
            <p>Halo,</p>
            <p>Langganan Anda akan berakhir besok. Mohon untuk memperbarui langganan Anda agar tetap dapat menikmati layanan kami tanpa gangguan. Anda dapat memperbarui langganan Anda melalui dashboard User atau bisa langsung klik tombol dibawah.</p>
            <a href="${process.env.APP_URL}/account/subscription" 
               style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
            Perbarui Langganan
            </a>
            <p style="margin-top: 20px;">
            Jika tombol di atas tidak berfungsi, gunakan tautan ini: <a href="${process.env.APP_URL}/account/subscription">${process.env.APP_URL}/account/subscription</a>
            </p>
            <p>Terima kasih telah menggunakan layanan kami.</p>
        </div>`;

        const { data, error } = await resend.emails.send({
            from: "WorkHive <noreply@workhive.my.id>",
            to: userEmail,
            subject: "Pengingat untuk Memperbarui Langganan Anda",
            html: htmlContent,
        });

        if (error) throw error;
    } catch (error) {
        console.error("Error sending renewal email", error);
    }
}
