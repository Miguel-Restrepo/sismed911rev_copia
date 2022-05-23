<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
/*
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
*/

Broadcast::channel('recordatorios', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});
Broadcast::channel('notificaciones', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});
Broadcast::channel('events', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});
Broadcast::channel('actinterh', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});
Broadcast::channel('actpreh', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});
Broadcast::channel('inactividadinterh', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});
Broadcast::channel('inactividadprehh', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});
Broadcast::channel('logs', function($user){
    if($user)
    {
        return true;
    }else{
        return true;
    }
    
});