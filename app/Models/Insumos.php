<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insumos extends Model
{
    use HasFactory;
    protected $table= "insumos";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_insumo';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
