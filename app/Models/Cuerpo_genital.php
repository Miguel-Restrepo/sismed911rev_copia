<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuerpo_genital extends Model
{
    use HasFactory;
    protected $table= "cuerpo_genital";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_genital';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
