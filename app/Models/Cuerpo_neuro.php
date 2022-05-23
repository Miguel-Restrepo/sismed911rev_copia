<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuerpo_neuro extends Model
{
    use HasFactory;
    protected $table= "cuerpo_neuro";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_neuro';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
