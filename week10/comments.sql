DROP TABLE IF EXISTS comments;

CREATE TABLE nodejs.comments (
    id INT NOT NULL AUTO_INCREMENT,
    commenter INT NOT NULL,
    comment VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    INDEX commenter_idx (commenter ASC),
    CONSTRAINT comment
    FOREIGN KEY (commenter) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) COMMENT="댓글" DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;
