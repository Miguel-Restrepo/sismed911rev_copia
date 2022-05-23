<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    use HasFactory;
    protected $table= "especialidad";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_especialidad ';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
