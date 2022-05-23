<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sala_medicamentos extends Model
{
    use HasFactory;
    protected $table= "sala_medicamentos";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_medicamento';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
