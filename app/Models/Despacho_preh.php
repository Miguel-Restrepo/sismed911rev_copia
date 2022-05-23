<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Despacho_preh extends Model
{
    use HasFactory;
    protected $table= "despacho_preh";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_despacho';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
