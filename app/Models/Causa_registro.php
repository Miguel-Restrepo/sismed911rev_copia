<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Causa_registro extends Model
{
    use HasFactory;
    protected $table= "causa_registro";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_registrocausa';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
