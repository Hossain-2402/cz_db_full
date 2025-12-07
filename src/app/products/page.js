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
const [position_of_delete_screen,set_position_of_delete_screen] = useState("-200vh");

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


  const [in_button_color,set_in_button_color] = useState("white");
  const [out_button_color,set_out_button_color] = useState("none");
  const [instock_button_background_color,set_instock_button_background_color] = useState("grey");
  const [stock_status,set_stock_status] = useState("");



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

  const newestFirst = Object.entries(snapshot.val())
    .map(([id, value]) => ({ id, ...value }))
    .sort((a, b) => b.createdAt - a.createdAt) // ✅ newest on top

  setProducts(newestFirst);	});
	
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
		set_stock_status(item.stock_status);

		if(item.stock_status === "in"){
			set_in_button_color("none");
			set_out_button_color("white");
			set_instock_button_background_color("#2ecc71");
		}else{
			set_in_button_color("white");
			set_out_button_color("none");
			set_instock_button_background_color("grey");
		}
		
		

	}

	const close_update_screen = ()=>{
		set_position_of_update_screen("-200vh");
	}

	const toggle_instock_button = ()=>{
		if(in_button_color === "white"){
			set_in_button_color("none");
			set_out_button_color("white");
			set_instock_button_background_color("#2ecc71");
			set_stock_status("in");
		}else{
			
			set_in_button_color("white");
			set_out_button_color("none");
			set_instock_button_background_color("grey");
			set_stock_status("out");
		}
	}


	const update_product_to_db = ()=>{
	 
		const data = {
			product_name : productName,
			product_price : productPrice || "",
			product_detail : productDetail || "",
			category: productCategory || "",
			productId: productID,

			leading_image : image ,
			first_image : first_image ,
			second_image : second_image ,
			third_image : third_image ,
			forth_image : forth_image ,
			stock_status : stock_status,	
			quantity : 1,
			sizes : "s"
		};


		update(ref(db_2, "messages/" + productID), data);
		close_update_screen();
	}


	
	const close_delete_screen = ()=>{
		set_position_of_delete_screen("-200vh");
	}

	const delete_product_from_db = ()=>{
		remove(ref(db_2, "messages/" + productID));
		close_delete_screen();
		close_update_screen();
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


			<div className="instock_toggle_area">
				<div className="instock_text">Stock : </div>
				<div style={{ background: instock_button_background_color }} className="instock_button" onClick={()=>{ toggle_instock_button() }}>
					<div style={{ background: in_button_color }} className="in_button"></div>
					<div style={{ background: out_button_color }} className="out_button"></div>
				</div>
			</div>




			<div className="update_item_button" onClick={()=>{ update_product_to_db()  }}>Update Product</div>
			
		      </div>
			<div className="delete_item_button" onClick={()=>{set_position_of_delete_screen("2.5vh");}}>Delete Product</div>
		</div>

		<div style={{top:position_of_delete_screen}} className="delete_screen">
			<div className="exit_delete_button" onClick={()=>{ close_delete_screen() }}>X</div>	
			<p className="alert_text">Are you sure? </p>
		     	<div className="delete_button" onClick={()=>{ delete_product_from_db()  }}>Delete</div>
		</div>


	
	</div>
  );
}
