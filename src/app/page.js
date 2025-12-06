"use client";

import {useState} from "react";
import { UploadButton } from "@/utils/uploadthing";
import "./Home.css";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';


export default function Home() {

	const router = useRouter();

	const go_to_NewProductScreen = ()=>{
        	router.push('/new');
	}
 
	const go_to_AllProductsScreen = ()=>{
        	router.push('/products');
	}
 
  return (
	<div className="Home">
		<div className="button_container">
			<div className="button" onClick={()=>{ go_to_AllProductsScreen() }}>All Products</div>	
			<div className="button" onClick={()=>{ go_to_NewProductScreen() }}>New Product </div>
		</div>	
	</div>
  );
}
