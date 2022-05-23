<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preh_maestro extends Model
{
    use HasFactory;
    protected $table= "preh_maestro";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'cod_casopreh';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
