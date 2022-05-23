<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interh_prioridad extends Model
{
    use HasFactory;
    protected $table= "interh_prioridad";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_prioridad';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
