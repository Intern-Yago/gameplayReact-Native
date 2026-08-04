import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

// Configura como a notificação deve ser exibida quando o app está em primeiro plano
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
    try {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('gameplay-reminders', {
                name: 'Lembretes de Partidas',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#E51C44',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        return finalStatus === 'granted';
    } catch (error) {
        console.log('Erro ao solicitar permissão de notificação:', error);
        return false;
    }
}

export async function scheduleAppointmentNotification(
    appointmentId: string,
    guildName: string,
    categoryName: string,
    day: string,
    month: string,
    hour: string,
    minute: string
): Promise<string | null> {
    try {
        const hasPermission = await requestNotificationPermissions();
        if (!hasPermission) {
            return null;
        }

        const now = new Date();
        const currentYear = now.getFullYear();

        const matchDate = new Date(
            currentYear,
            parseInt(month, 10) - 1,
            parseInt(day, 10),
            parseInt(hour, 10),
            parseInt(minute, 10)
        );

        // Se a data já passou, não agenda
        if (matchDate.getTime() <= now.getTime()) {
            return null;
        }

        // Agenda notificação 15 minutos antes da partida, ou imediatamente se falta menos de 15 min
        let triggerDate = new Date(matchDate.getTime() - 15 * 60 * 1000);
        if (triggerDate.getTime() <= now.getTime()) {
            triggerDate = new Date(now.getTime() + 10 * 1000); // 10 segundos a partir de agora
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: `🎮 Partida agendada: ${guildName}`,
                body: `Sua partida de ${categoryName} começa em breve! (${day}/${month} às ${hour}:${minute}h)`,
                sound: true,
                data: { appointmentId },
            },
            trigger: triggerDate,
        });

        return notificationId;
    } catch (error) {
        console.log('Erro ao agendar notificação:', error);
        return null;
    }
}

export async function cancelAppointmentNotification(notificationId?: string): Promise<void> {
    if (!notificationId) return;
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
        console.log('Erro ao cancelar notificação:', error);
    }
}
