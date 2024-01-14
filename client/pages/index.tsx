import MainLayout from "@/layouts/MainLayout";
import React from 'react';

const Index = () => {
    return (
        <>
            <MainLayout>
                <div className="center">
                    <h1>Welcome!</h1>
                    <h3>Here are the best tracks!</h3>
                </div>
            </MainLayout>

            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
        </>
    );
};

export default Index;