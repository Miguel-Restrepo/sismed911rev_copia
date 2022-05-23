<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interh_accion extends Model
{
    use HasFactory;
    protected $table= "interh_accion";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_accion';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
