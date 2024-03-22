"use client";
import Image from "next/image";
import Hero from "./_components/Hero";
import GlobalApi from "./_services/GlobalApi";
import { useEffect, useState } from "react";
import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  useEffect(()=>{
    getCategoryList();
    getBusinessList();
  },[])

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp=>{
      setCategoryList(resp.categories)
    })
  }

  const getBusinessList = () => {
    GlobalApi.getBusinessList().then(resp=>{
      setBusinessList(resp.businessLists)
    })
  }
  return (
    <div>
      <Hero/>

      <CategoryList categoryList={categoryList}/>

      <BusinessList businessList={businessList} title={'Popular Business'}/>
    </div>
  );
}
