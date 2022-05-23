<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad_hospital extends Model
{
    use HasFactory;
    protected $table= "especialidad_hospital";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_especialidad';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
