import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string
}

export function BlogCard({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) {
    return (
        <Link to={`/blog/${id}`}>
        <div className='border border-slate-200 pb-4 p-4 cursor-pointer'>
            <div className='flex '>
                <div className='flex justify-center flex-col'>
               <Avatar name={authorName}/> 
               </div>
               <div className='font-etralight pl-4 pt-2'>
                {authorName}
               </div>
               <div className='pt-3 ml-1 mr-1 text-xs'>
               &#9679;
               </div>
               <div className='pt-2 font-thin '>
                {publishedDate}
                </div>
            </div>
            <div className='text-xl font-semibold pt-2'>
                {title}
            </div>
            <div className='text-md font-thin pt-1'>
                {content.slice(0, 100) + "...."}
            </div>
            <div className='text-slate-500 pt-2'>
                {`${Math.ceil(content.length / 100)} min(s) read`}
            </div>
        </div>
        </Link>
    );
}
export function Avatar({name}:{name:string})
{
    return<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>

}
