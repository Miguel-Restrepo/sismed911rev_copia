<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preh_evaluacionclinica extends Model
{
    use HasFactory;
    protected $table= "preh_evaluacionclinica";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_evaluacionclinica';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
