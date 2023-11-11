const pool = require('../../config/db');

class AbilityController {
    // [GET]
    async index(req, res) {
        try {
            const query = 'SELECT * FROM project_user';
            const response = await pool.query(query);
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
    // [GET]
    async getByProjectID(req, res, next) {
        try {
            const id = parseInt(req.params.project_id);
            const response = await pool.query('SELECT * FROM project_user WHERE project_id = $1', [id]);
            return res.status(200).json(response.rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }
    // [POST]
    async create(req, res) {
        try {
            const { project_id, user_id, is_checked } = req.body;
            const response = await pool.query(
                'INSERT INTO project_user (project_id, user_id, is_checked) VALUES ($1, $2, $3)',
                [project_id, user_id, is_checked],
            );

            return res.status(200).json({
                message: 'User created successfully',
                code: '200',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error');
        }
    }

    // [PUT]
    async update(req, res) {
        try {
            const { name } = req.body;
            const id = parseInt(req.params.slug);
            const query = `
                UPDATE ability SET name = $1 WHERE id = $2
            `;
            const values = [name, id];
            const response = await pool.query(query, values);

            return res.status(200).json({
                message: 'Update Project successfully!',
                data: response,
            });
        } catch (err) {
            console.log(err);
        }
    }

    // [DELETE]
    async delete(req, res) {
        try {
            const id = parseInt(req.params.slug);
            const deleteProjectQuery = `
                DELETE FROM ability
                WHERE id = $1
            `;
            const response = await pool.query(deleteProjectQuery, [id]);
            return res.status(200).json({
                message: 'Delete Project successfully!',
                data: response,
            });
        } catch (error) {}
    }
}

module.exports = new AbilityController();
