
import { supabase } from '@/integrations/supabase/client';

export const logActivity = async (
  userId: string,
  activityType: string,
  description: string,
  metadata?: any
) => {
  try {
    const { error } = await supabase
      .from('activity_logs')
      .insert({
        user_id: userId,
        activity_type: activityType,
        description,
        metadata: metadata || null
      });

    if (error) {
      console.error('Error logging activity:', error);
    }
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

export const sendNotification = async (
  userId: string,
  title: string,
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info'
) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type
      });

    if (error) {
      console.error('Error sending notification:', error);
    }
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
