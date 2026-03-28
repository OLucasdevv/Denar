const FeatureCards = ({title, description, image}) => {
    return (
        <div className="flex flex-col w-80 bg-gradient-to-b from-primary/50 to-white h-96 rounded-3xl p-6 ">
            
            <div className="flex-1 flex flex-col gap-3">
                <h1 className="font-medium text-xl">
                    {title}
                </h1>
                <p className="text-gray-700 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
            
            <div className="flex-shrink-0 h-56 flex items-end justify-center">
                <img 
                    src={image}
                    alt= "image"
                    className="max-h-full w-auto object-contain"
                />
            </div>
        </div>
    )
};
export default FeatureCards;