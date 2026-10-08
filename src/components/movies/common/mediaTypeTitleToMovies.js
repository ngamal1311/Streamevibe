const MediaTypeTitle = ({ title }) => {
    return (
        <div className="mb-8">
            <span className="inline-block bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-md relative -top-14 left-8">
                {title}
            </span>
        </div>
    );
};

export default MediaTypeTitle;