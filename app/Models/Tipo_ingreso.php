<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo_ingreso extends Model
{
    use HasFactory;
    protected $table= "tipo_ingreso";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_ingreso';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
