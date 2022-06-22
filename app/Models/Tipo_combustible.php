<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo_combustible extends Model
{
    use HasFactory;
    protected $table= "tipo_combustible";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
