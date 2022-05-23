<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala_motivoatencion extends Model
{
    use HasFactory;
    protected $table= "sala_motivoatencion";
     //protected $fillable= [''];//Especifica los campo a guardar
     public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_motivoatencion';//Define id
     protected $guarded= [];//especifica que quiere ignorar
}
