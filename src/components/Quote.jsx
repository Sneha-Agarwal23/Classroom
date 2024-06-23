export const Quote = () => {
    return (
        <div className="h-screen flex justify-center items-center" style={{ backgroundImage: "url('/images/image.avif')" }}>
            <div className="max-w-lg text-center bg-slate-300 bg-opacity-75 p-8 rounded-lg shadow-lg">
                <div className="text-3xl font-bold font-italic">
                    "The goal of early childhood education should be to activate the child's own desire to learn".
                </div>
                <div className="max-w-md font-semibold text-xl text-left mt-6">
                    -Maria Montessori
                </div>
            
            </div>
        </div>
    );
};
