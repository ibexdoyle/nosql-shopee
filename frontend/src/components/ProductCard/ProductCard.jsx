import React from 'react';
import { Card, CardContent, CardMedia} from "@mui/material";
import Star from '../../assets/image/icon/star.png'
import FormatNumber from '../../utils/FormatNumber'

const ProductCard = ({product}) =>{
    
    return(
        <Card>
            <CardMedia component="img" height="180" image={product.image} alt={product.name} className="object-cover"/>

            <CardContent className='p-4 flex flex-col gap-1'>
                <h3 className="line-clamp-2">{product.name}</h3>
                <div className="price flex gap-2">
                    <span className="text-emerald-green text-xl font-bold">₫{product.salePrice.toLocaleString("vi-VN")}</span>
                    {product.originalPrice > product.salePrice && (
                        <span className='bg-mint text-emerald-green text-[0.75rem] px-1 py-0.5 rounded-sm'>
                            -{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                        </span>
                    )}
                </div>
                <div className='flex gap-3'>
                    <div className='rating flex gap-1'>
                        <img src={Star} alt="rating" className="w-5 h-5"/>
                        <span>{product.rating}</span>
                    </div>
                    <span className='text-smoke'>|</span>
                    <div>Đã bán {FormatNumber(product.sold)}</div>
                </div>
                <div className="flex gap-1">
                    <i className="fi fi-rr-marker"></i>
                    <span>{product.address}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard;