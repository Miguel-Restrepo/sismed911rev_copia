<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cama extends Model
{
    use HasFactory;
    protected $table= "cama";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_sala_camas';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
