<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicios_division extends Model
{
    use HasFactory;
    protected $table= "servicios_division";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_servicio';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
