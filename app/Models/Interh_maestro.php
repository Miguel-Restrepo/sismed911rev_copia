<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Interh_maestro extends Model
{
    public $timestamps = false; //para evitar que laravel cree las columnas updated_at y created_at
    protected $primaryKey = 'cod_casointerh'; //para evitar que laravel tome por defecto como pk id
    use HasFactory;
    protected $table = "interh_maestro";
    //protected $fillable= [''];//Especifica los campo a guardar
    protected $guarded = []; //especifica que quiere ignorar
}
