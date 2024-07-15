"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'sonner';
import { AiOutlineLoading } from 'react-icons/ai';

interface Correction {
    original_text?: string;
    corrected_text?: string;
    corrections?: string;
}

const HeroSection = ({ original_text, corrected_text, corrections }: Correction) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialText = searchParams.get('text') || '';
    const [text, setText] = useState<string>('');
    const [result, setResult] = useState<Correction | null>(null);
    const [loading, setIsLoading] = useState<boolean>(false);

    const handleCorrect = async (inputText: string) => {
        if (!inputText) {
            setResult(null);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:5000/process', {
                input_text: inputText
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error correcting text:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            handleCorrect(text);
            router.push(`?text=${encodeURIComponent(text)}`, undefined);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [text, router]);

    const handleCopy = () => {
        if (result && result.corrected_text) {
            navigator.clipboard.writeText(result.corrected_text).then(() => {
                toast.success('Text copied to clipboard');
            }).catch(err => {
                toast.error('Failed to copy text to clipboard');
            });
        }
    };

    return (
        <div className='wrapper py-0 bg-gray-50 rounded-[8px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex items-center'>
            <div className='w-full h-[350px]'>
                <div className='w-full px-6 py-3 border-b-2 border-gray-300 bg-gray-100 rounded-tl-[8px]'>
                    <h1 className='text-[21px] font-bold'>Aduh</h1>
                </div>

                <Textarea
                    defaultValue={initialText}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to correct"
                    className='font-medium text-md focus-visible:ring-0 focus-visible:ring-transparent bg-transparent focus-visible:ring-offset-0 border-none px-6 py-6 resize-none h-[328px] placeholder:text-[20px] text-[20px]'
                />

            </div>
            <div className='w-full h-[350px] border-l-2 border-gray-100 relative'>
                <div className='w-full px-6 py-3 border-b-2 border-gray-300 bg-gray-100 rounded-tr-[8px] pl-6'>
                    <h1 className='text-[21px] font-bold'>Mamae</h1>
                </div>

                {loading ? (
                    <AiOutlineLoading className='w-7 h-7 absolute animate-spin right-1/2 bottom-1/2' />
                ) : (
                    <>
                        {result && (
                            <ScrollArea
                                className='font-medium text-md focus-visible:ring-0 focus-visible:ring-transparent bg-transparent focus-visible:ring-offset-0 border-none px-6 py-6 resize-none h-[294px] placeholder:text-[20px]'
                            >
                                <div className='flex flex-col gap-6'>
                                    <div className='flex gap-10 relative'>
                                        <p className='font-medium text-[20px]'>{result.corrected_text}</p>


                                        <MdOutlineContentCopy className='absolute w-6 h-6 right-0 text-gray-500 cursor-pointer active:scale-125 transition-all duration-300' onClick={handleCopy} />
                                    </div>

                                    <Separator className='bg-gray-200' />

                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-gray-500 text-[20px]'>Corrections:</h1>
                                        <h2 className='text-[20px] font-medium'>
                                            {result.corrections && result.corrections.length > 0 ? result.corrections : "Yo're all good!"}
                                        </h2>
                                    </div>
                                </div>
                            </ScrollArea>
                        )}
                    </>
                )}

            </div>

            {/* <Input
                defaultValue={initialText}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to correct"
                className='font-medium text-md'
            />
            
            {result && (
                <div className='flex flex-col gap-6 mt-6'>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-lg font-semibold'>Original Text</h2>
                            <p className='font-medium text-md'>{result.original_text}</p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h2 className='text-lg font-semibold'>Corrected Text</h2>
                            <p className='font-medium text-md'>{result.corrected_text}</p>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <h2 className='text-lg font-semibold'>{result.corrections}</h2>
                        
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default HeroSection