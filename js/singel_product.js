document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Create zoomed image container
    const zoomContainer = document.createElement('div');
    zoomContainer.classList.add('zoom-container');
    zoomContainer.style.cssText = `
        position: absolute;
        overflow: hidden;
        width: 300px;
        height: 300px;
        border: 4px solid #666;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: none;
        pointer-events: none;
        position: fixed;
        z-index: 1000;
        border-radius: 10px;
    `;
    
    const zoomedImage = document.createElement('img');
    zoomedImage.classList.add('zoomed-image');
    zoomedImage.style.cssText = `
        position: absolute;
        width: 400%;
        height: 400%;
        object-fit: cover;
    `;
    
    zoomContainer.appendChild(zoomedImage);
    document.body.appendChild(zoomContainer);
    
    mainImage.addEventListener('mouseenter', function(event) {
        zoomedImage.src = mainImage.src;
        zoomContainer.style.display = 'block';
    });
    
    mainImage.addEventListener('mousemove', function(event) {
        const rect = mainImage.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        
        zoomContainer.style.left = `${event.clientX + 20}px`;
        zoomContainer.style.top = `${event.clientY + 20}px`;
        
        zoomedImage.style.transform = `translate(-${x}%, -${y}%)`;
    });
    
    mainImage.addEventListener('mouseleave', function() {
        zoomContainer.style.display = 'none';
    });
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.src;
        });
    });
});

