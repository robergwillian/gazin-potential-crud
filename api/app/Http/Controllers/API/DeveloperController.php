<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Developer as Developer;
use App\Http\Resources\DeveloperResource as DeveloperResource;

class DeveloperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $developers = Developer::all();

        // return response()->json($data);
        return response()->json(DeveloperResource::collection($developers),200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'sex' => 'required',
            'age' => 'required',
            'hobby' => 'required',
        
        ]);

        if($validator->fails()) {
            return response()->json($validator->erros(),400);
        }

        $developer = Developer::create([
            'name' => $request->name,
            'sex' => $request->sex,
            'age' => $request->age,
            'hobby' => $request->hobby,
            'dob' => $request->dob
        ]);

        return response()->json(new DeveloperResource($developer), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $developer = Developer::find($id);
        
        if(is_null($developer)) {
            return response()->json('Developer not found', 404);
        }

        return response()->json(new DeveloperResource($developer));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'sex' => 'required',
            'age' => 'required',
            'hobby' => 'required',
        
        ]);

        if($validator->fails()) {
            return response()->json($validator->erros(),400);
        }

        $developer = Developer::find($id);

        $developer->name = $request->name;
        $developer->sex = $request->sex;
        $developer->age = $request->age;
        $developer->hobby = $request->hobby;
        $developer->dob = $request->dob;
        $developer->save();

        return response()->json(new DeveloperResource($developer),200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //

        $developer = Developer::findOrFail($id);
        if($developer->delete()){
            return response()->json(new DeveloperResource($developer),200);
        }
    }

    public function queryString($param)
    {
        $developer = Developer::findOrFail($param)->paginate(10);

        return response()->json(new DeveloperResource($developer));
    }
}
