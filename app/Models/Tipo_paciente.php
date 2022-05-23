<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo_paciente extends Model
{
    use HasFactory;
    protected $table= "tipo_paciente";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_tipopaciente';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
