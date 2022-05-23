<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuerpo_cabeza extends Model
{
    use HasFactory;
    protected $table= "cuerpo_cabeza";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_cabeza';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
