<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Censo_total extends Model
{
    use HasFactory;
    protected $table= "censo_total";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_hospital';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
