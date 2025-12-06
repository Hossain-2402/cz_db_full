"use client";

import {useState, useEffect} from "react";
import "./Products.css";
import { db_2 } from "../firebase_realtime.js";
import { ref, onValue, set, update, remove } from "firebase/database";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid'
import { UploadButton } from "@/utils/uploadthing";
import { Edit, Edit2, Edit3, Pen } from "lucide-react";



export default function Products() {

const [position_of_update_screen,set_position_of_update_screen] = useState("-200vh");

const [image, setImage] = useState(null);
const [first_image, set_first_image] = useState(null);
const [second_image, set_second_image] = useState(null);
const [third_image, set_third_image] = useState(null);
const [forth_image, set_forth_image] = useState(null);
  
  const [productName,setProductName] = useState("");
  const [productPrice,setProductPrice] = useState("");
  const [productDetail,setProductDetail] = useState("");
  const [productCategory,setProductCategory] = useState("");

  const [productID,setProductID] = useState("");


  const handle_product_name = (e)=>{
    setProductName(e.target.value);
  }
  const handle_product_price = (e)=>{
    setProductPrice(e.target.value);
  }
  const handle_product_detail = (e)=>{
    setProductDetail(e.target.value);
  }
  const handle_product_category = (e)=>{
    setProductCategory(e.target.value);
  }


  const [products,setProducts] = useState([{
	product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	},
	{
        product_name : "-----",
        product_price : "-----",
        product_detail : "-----" ,
        leading_image : "https://imgs.search.brave.com/HeoLn61NvDjdP6PXVEIX0AH9OtHSD5H_vIgdGxApXXM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcwLzY5LzU1/LzM2MF9GXzU3MDY5/NTU4NF9Lc0hNQkw5/ZGE2VkVVbXBTY2VD/N2d3ejRzQWE4VTVp/NC5qcGc",
        first_image : "-----",
        second_image : "-----",
        third_image : "-----",
        forth_image : "-----",
        quantity : 1,
        sizes : "S"
	}]);




  useEffect(()=>{
		
	const msgRef = ref(db_2, "messages");

	onValue(msgRef, (snapshot) => {
	  if (!snapshot.exists()) {
	    setProducts([]);
	    return;
	  }

	  const sorted = Object.entries(snapshot.val())
	    .sort((a, b) => (a[0] < b[0] ? 1 : -1))  // descending key order
	    .map(([id, value]) => ({
	      id,
	      ...value
	    }));

	  setProducts(sorted);
	});
	
  },[]);



	const toggle_update_screen = (item)=>{
		set_position_of_update_screen("2.5vh");


		
		setImage(item.leading_image);
		set_first_image(item.first_image);
		set_second_image(item.second_image);
		set_third_image(item.third_image);
		set_forth_image(item.forth_image);
		  
		setProductName(item.product_name);
		setProductPrice(item.product_price);
		setProductDetail(item.product_detail);
		setProductCategory(item.category);

		setProductID(item.productId);

		

	}

	const close_update_screen = ()=>{
		set_position_of_update_screen("-200vh");
	}

	const update_product_to_db = ()=>{
	 
		const data = {
			product_name : productName,
			product_price : productPrice || "",
			product_detail : productDetail || "",
			category: productCategory || "",
			productid: productID,

			leading_image : image ?? null,
			first_image : first_image ?? null,
			second_image : second_image ?? null,
			third_image : third_image ?? null,
			forth_image : forth_image ?? null,

			quantity : 1,
			sizes : "s",
		};


		update(ref(db_2, "messages/" + productID), data);
	}


  return (
	<div className="Home">
		<p className="header_text"> All Products </p>

		<div className="products_area">
			{products.map((item,index) =>{
		            return (
			            <div key={index} className="product" 
				            >
					      <img src={item.leading_image} className="image"/>

						<div className="product_name">{item.product_name} </div>
						<div className="price">৳ {item.product_price}</div>
						<div className="edit_button" onClick={()=>{ toggle_update_screen(item) }}><Edit2 size={20} /></div>
			            </div>);
	          	})}
		</div>



		<div style={{top:position_of_update_screen}} className="update_screen">
	              <div className="exit_update_button" onClick={()=>{ close_update_screen() }}>X</div>	

		      <div className="add_new_item_area">
			<div className="leading_image">
			  <img src={image || undefined} alt="" className="preview_leading_image"/>
			   <UploadButton
			     content={{
				button({ ready }) {
				  if (ready) return <div>Upload</div>;
				}
			      }}
			      appearance={{
				button: {
				  background : 'black',
				},

			      }}
			      className="upload_btn"
			      endpoint="imageUploader"
			      onClientUploadComplete={(res) => {
				setImage(res[0].url);
			      }}
			      onUploadError={(error) => {
				alert(`ERROR! ${error.message}`);
			      }}
			    />
			</div>
			<div className="supporting_images_area">
			  <div className="first_image">
			    
			   <img src={first_image || undefined} alt="" className="preview_leading_image"/>
			   <UploadButton
			      content={{
				button({ ready }) {
				  if (ready) return <div>Upload</div>;
				}
			      }}
			      appearance={{
				button: {
				  background : 'black',
				},

			      }}
			      className="upload_btn supporting_image_upload"
			      endpoint="imageUploader"
			      onClientUploadComplete={(res) => {
				set_first_image(res[0].url);
			      }}
			      onUploadError={(error) => {
				alert(`ERROR! ${error.message}`);
			      }}
			    />

			  </div>
			  <div className="second_image">
			    
			   <img src={second_image || undefined} alt="" className="preview_leading_image"/>
			   <UploadButton
			      content={{
				button({ ready }) {
				  if (ready) return <div>Upload</div>;
				}
			      }}
			      appearance={{
				button: {
				  background : 'black',
				},

			      }}
			      className="upload_btn supporting_image_upload"
			      endpoint="imageUploader"
			      onClientUploadComplete={(res) => {
				set_second_image(res[0].url);
			      }}
			      onUploadError={(error) => {
				alert(`ERROR! ${error.message}`);
			      }}
			    />

			  </div>
			  <div className="third_image">
			    
			   <img src={third_image || undefined} alt="" className="preview_leading_image"/>
			   <UploadButton
			      content={{
				button({ ready }) {
				  if (ready) return <div>Upload</div>;
				}
			      }}
			      appearance={{
				button: {
				  background : 'black',
				},

			      }}
			      className="upload_btn supporting_image_upload"
			      endpoint="imageUploader"
			      onClientUploadComplete={(res) => {
				set_third_image(res[0].url);
			      }}
			      onUploadError={(error) => {
				alert(`ERROR! ${error.message}`);
			      }}
			    />

			  </div>
			  <div className="forth_image">
			    
			   <img src={forth_image || undefined} alt="" className="preview_leading_image"/>
			   <UploadButton
			      content={{
				button({ ready }) {
				  if (ready) return <div>Upload</div>;
				}
			      }}
			      appearance={{
				button: {
				  background : 'black',
				},

			      }}
			      className="upload_btn supporting_image_upload"
			      endpoint="imageUploader"
			      onClientUploadComplete={(res) => {
				set_forth_image(res[0].url);
			      }}
			      onUploadError={(error) => {
				alert(`ERROR! ${error.message}`);
			      }}
			    />

			  </div>
			</div>

			<input type="text" placeholder="Enter Product Name" className="input "  onChange={(e)=>{handle_product_name(e)}} value={productName} />
			<input type="text" placeholder="Enter Product Price" className="input " onChange={(e)=>{handle_product_price(e)}} value={productPrice}/>
			<textarea type="text" placeholder="Enter Image Description" className="input " onChange={(e)=>{handle_product_detail(e)}} value={productDetail}></textarea>
			<input type="text" placeholder="Enter Product Category" className="input " onChange={(e)=>{handle_product_category(e)}} value={productCategory} />

			<div className="update_item_button" onClick={()=>{ update_product_to_db()  }}>Update Product</div>
		      </div>
		</div>


	
	</div>
  );
}
