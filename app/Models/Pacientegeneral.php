<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pacientegeneral extends Model
{
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_paciente';//Define id
    use HasFactory;
    protected $table= "pacientegeneral";
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
