<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userlevels extends Model
{
    use HasFactory;
    protected $table= "userlevels";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'userlevelid';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
