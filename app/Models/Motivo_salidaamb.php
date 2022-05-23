<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motivo_salidaamb extends Model
{
    use HasFactory;
    protected $table= "motivo_salidaamb";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_motivosalida';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
