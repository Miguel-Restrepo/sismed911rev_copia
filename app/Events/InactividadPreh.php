<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InactividadPreh implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public string $datos;
    public string $fecha;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(string $datos,string $fecha)
    {
        //
        $this->datos= $datos;
        $this->fecha=$fecha;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('inactividadprehh');
    }
}
