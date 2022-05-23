<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catalogo_serv_taller extends Model
{
    use HasFactory;
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_catalogo';//Define id
    protected $table= "catalogo_serv_taller";
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
