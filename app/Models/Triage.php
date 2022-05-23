<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Triage extends Model
{
    use HasFactory;
    
    protected $table= "triage";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'id_triage';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
