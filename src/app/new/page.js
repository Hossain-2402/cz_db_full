"use client";

import {useState} from "react";
import { UploadButton } from "../../utils/uploadthing";
import "./New.css";
import { v4 as uuidv4 } from 'uuid';

import { db_2 } from "../firebase_realtime.js";
import { ref, onValue, set, update, remove } from "firebase/database";


export default function Home() {
const [image, setImage] = useState(null);
const [first_image, set_first_image] = useState(null);
const [second_image, set_second_image] = useState(null);
const [third_image, set_third_image] = useState(null);
const [forth_image, set_forth_image] = useState(null);
  
  const [productName,setProductName] = useState("");
  const [productPrice,setProductPrice] = useState("");
  const [productDetail,setProductDetail] = useState("");
  const [productCategory,setProductCategory] = useState("");




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

  const add_new_product_to_db = ()=>{
    if(productName === "" || productPrice === "" || productDetail === "" || productCategory === ""){
	alert("Enter all the fields");
	return;
    }
    const unique_id = uuidv4();
    //
    // db.collection('products').add(
    //   {
    //     product_name : productName,
    //     product_price : productPrice,
    //     product_detail :productDetail,
    //     product_catefory: productCategory,
    //     productId: unique_id,
    //     leading_image : image,
    //     first_image : first_image,
    //     second_image : second_image,
    //     third_image : third_image,
    //     forth_image : forth_image,
    //     quantity : 1,
    //     sizes : "S",
    //     timestamp : firebase.firestore.FieldValue.serverTimestamp()
    // }) ;
    //


		const data = {
  product_name : productName,
  product_price : productPrice || "",
  product_detail : productDetail || "",
  category: productCategory || "",
  productId: unique_id,

  leading_image : image ?? null,
  first_image : first_image ?? null,
  second_image : second_image ?? null,
  third_image : third_image ?? null,
  forth_image : forth_image ?? null,

  quantity : 1,
  sizes : "S",		};


		set(ref(db_2, "messages/" + unique_id), data);


		    setProductName("");
		    setProductPrice("");
		    setProductDetail("");
		    setProductCategory("");

		    setImage(null);
		    set_first_image(null);
		    set_second_image(null);
		    set_third_image(null);
		    set_forth_image(null);
  }

  return (
    <div className="Home">
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
        <input type="number" placeholder="Enter Product Price" className="input " onChange={(e)=>{handle_product_price(e)}} value={productPrice}/>
        <textarea type="text" placeholder="Enter Image Description" className="input " onChange={(e)=>{handle_product_detail(e)}} value={productDetail}></textarea>
        <input type="text" placeholder="Enter Product Category" className="input " onChange={(e)=>{handle_product_category(e)}} value={productCategory} />

        <div className="add_item_button" onClick={()=>{ add_new_product_to_db()  }}>Add Product</div>
      </div>
    </div>
  );
}
