<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Riesgo extends Model
{
    use HasFactory;
    protected $table= "riesgo";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    //protected $primaryKey = 'id_sala_procedimiento  ';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
