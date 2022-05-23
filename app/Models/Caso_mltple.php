<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caso_mltple extends Model
{
    use HasFactory;
    protected $table= "caso_mltple";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_casomltple';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
