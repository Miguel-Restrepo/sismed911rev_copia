<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Censo_camas extends Model
{
    use HasFactory;
    
    protected $table= "censo_camas";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_cama';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
