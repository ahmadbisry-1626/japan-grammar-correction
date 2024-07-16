"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'sonner';
import { AiOutlineLoading } from 'react-icons/ai';
import Image from 'next/image';
import { FaRegShareFromSquare } from 'react-icons/fa6';

interface Correction {
    original_text?: string;
    corrected_text?: string;
    corrections?: string;
}

const HeroSection = ({ original_text, corrected_text, corrections }: Correction) => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const [text, setText] = useState<string>(query);
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
            const param = new URLSearchParams(window.location.search);
            if (text) {
                param.set('query', text);
            } else {
                param.delete('query');
            }
            setIsLoading(false);
            replace(`${pathname}?${param.toString()}`);
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [text, pathname, replace]);

    const handleCopy = () => {
        if (result && result.corrected_text) {
            navigator.clipboard.writeText(result.corrected_text).then(() => {
                toast.success('Text copied to clipboard');
            }).catch(err => {
                toast.error('Failed to copy text to clipboard');
            });
        }
    };

    const handleShare = () => {
        const shareUrl = `${window.location.origin}${pathname}?${new URLSearchParams({ query: text }).toString()}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            toast.success('Link copied to clipboard!');
        }).catch(err => {
            toast.error('Failed to copy link to clipboard');
        });
    };

    return (
        <div className='wrapper py-0 flex items-center lg:gap-6 gap-12 max-lg:flex-col'>
            <div className='w-full h-[350px] bg-gray-50 rounded-[12px] relative shadow-md'>
                <div className='md:w-[225px] w-[200px] flex items-center justify-center px-6 py-3 bg-[#6ACFC7] rounded-[12px] rounded-b-none absolute -translate-y-6 z-10 border-r-2 border-gray-50'>
                    <div className='flex items-center gap-4'>
                        <Image src="/icons/file-white.png" alt='' width={30} height={30} className='md:w-[30px] md:h-[30px] w-[20px] h-[20px]'/>
                        <h1 className='md:text-[21px] text-[18px] text-center font-bold text-gray-50'>Original Text</h1>
                    </div>
                </div>

                <div className='w-full h-[32px] bg-[#6ACFC7] absolute rounded-tr-[12px]' />

                <Textarea
                    defaultValue={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to correct"
                    className='font-medium text-md focus-visible:ring-0 focus-visible:ring-transparent bg-transparent focus-visible:ring-offset-0 border-none px-6 py-6 resize-none h-[328px] placeholder:text-[20px] text-[20px] pt-14'
                />

            </div>
            <div className='w-full h-[350px] bg-gray-50 relative shadow-md rounded-[12px]'>
                <div className='md:w-[250px] w-[220px] flex items-center justify-center px-6 py-3 bg-[#6ACFC7] rounded-[12px] rounded-b-none absolute -translate-y-6 z-20 border-r-2 border-gray-50'>
                    <div className='flex items-center gap-4'>
                        <Image src="/icons/text.png" alt='' width={30} height={30} className='md:w-[30px] md:h-[30px] w-[20px] h-[20px]'/>
                        <h1 className='md:text-[21px] text-[18px] text-center font-bold text-gray-50'>Corrected Text</h1>
                    </div>
                </div>
                <div className='w-full h-[32px] bg-[#6ACFC7] absolute rounded-tr-[12px] z-10' />

                {loading ? (
                    <AiOutlineLoading className='w-7 h-7 absolute animate-spin right-1/2 bottom-1/2' />
                ) : (
                    <>
                        {result ? (
                            <ScrollArea
                                className='font-medium text-md focus-visible:ring-0 focus-visible:ring-transparent bg-transparent focus-visible:ring-offset-0 border-none px-6 pt-14 pb-6 resize-none h-[350px] placeholder:text-[20px]'
                            >
                                <div className='flex flex-col gap-6'>
                                    <div className='flex gap-10 relative'>
                                        <p className='font-medium text-[20px] xl:max-w-[530px] md:max-w-[590px] max-w-[270px]'>{result.corrected_text}</p>

                                        <div className='flex flex-col gap-4 absolute right-0'>
                                            <MdOutlineContentCopy className=' w-6 h-6 text-gray-500 cursor-pointer active:scale-125 transition-all duration-300' onClick={handleCopy} />
                                            <FaRegShareFromSquare className=' w-6 h-6 text-gray-500 cursor-pointer active:scale-125 transition-all duration-300' onClick={handleShare}/>
                                        </div>
                                    </div>

                                    <Separator className={`bg-gray-200 md:mt-6`} />

                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-gray-500 text-[20px]'>Corrections:</h1>
                                        <h2 className='text-[20px] font-medium'>
                                            {result.corrections && result.corrections.length > 0 ? result.corrections : "Yo're all good!"}
                                        </h2>
                                    </div>
                                </div>
                            </ScrollArea>
                        ) : (
                            <p className='font-medium text-[20px] px-6 text-gray-500 pt-14 select-none'>Here's where your text will be corrected</p>
                        )}

                    </>
                )}

            </div>
        </div>
    )
}

export default HeroSection