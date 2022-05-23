<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoginNotification extends Notification implements ShouldBroadcast
{
    use Queueable;
public string $mensaje;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $mensaje)
    {
        //
        $this->mensaje= $mensaje;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast'];
    }
    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message'=> "$this->mensaje (User ID: $notifiable->id)"
        ]);
    }
}
