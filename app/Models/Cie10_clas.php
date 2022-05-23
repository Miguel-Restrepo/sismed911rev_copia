<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cie10_clas extends Model
{
    use HasFactory;
    
    protected $table= "cie10_clas";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'cod';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
